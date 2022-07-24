some of commands that i used
 
 helm install vault hashicorp1/vault --values helm-vault-raft-values.yml                                                                              
 
 kubectl get all                                                                                                               
 
 kubectl exec vault-0 -- vault operator init     -key-shares=1     -key-threshold=1     -format=json > cluster-keys.json                                                                        
 
 kubectl get all                                                                                                                       
 
 cat cluster-keys.json 
 
 jq -r ".unseal_keys_b64[]" cluster-keys.json
 
 VAULT_UNSEAL_KEY=$(jq -r ".unseal_keys_b64[]" cluster-keys.json)
 
 kubectl exec vault-0 -- vault operator unseal $VAULT_UNSEAL_KEY

 kubectl exec -ti vault-1 -- vault operator raft join http://vault-0.vault-internal:8200
 
 kubectl exec -ti vault-2 -- vault operator raft join http://vault-0.vault-internal:8200
 
 kubectl exec -ti vault-1 -- vault operator unseal $VAULT_UNSEAL_KEY
 
 kubectl exec -ti vault-2 -- vault operator unseal $VAULT_UNSEAL_KEY
 
 jq -r ".root_token" cluster-keys.json
 
lets go inside the vault and put secrets and policy
 kubectl exec --stdin=true --tty=true vault-0 -- /bin/sh
 1- vault login
 2- vault secrets enable -path=secret kv-v2
 3- vault kv get secret/webapp/config
now for auth 
 4- vault auth enable kubernetes
 5- vault write auth/kubernetes/config \
    token_reviewer_jwt="$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
    kubernetes_host=https://${KUBERNETES_PORT_443_TCP_ADDR}:443 \
    kubernetes_ca_cert=@/var/run/secrets/kubernetes.io/serviceaccount/ca.crt
 6- vault write auth/kubernetes/role/myapp \
    bound_service_account_names=app \
    bound_service_account_namespaces=demo \
    policies=app \
    ttl=1h
 7- vault kv put secret/helloworld username=foobaruser password=foobarbazpass
 
 kubectl apply --filename deployment-01-webapp.yml
 
