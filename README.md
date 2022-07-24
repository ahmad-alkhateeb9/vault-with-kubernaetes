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
 
 kubectl exec --stdin=true --tty=true vault-0 -- /bin/sh
 
 kubectl apply --filename deployment-01-webapp.yml
 
