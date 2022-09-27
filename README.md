This script was developed due to the fact that Intercom does not support deleting multiple contacts at the same time. Neither is there an endpoint to pass a multiple delete request through the api.

This script uses node-fetch to make curl-calls to get contacts and delete them 1 by 1 if they have the status last_contacted set to null and their email adress does not contain the upsales domain# intercomdelete
