<?php

return [
     /*
     |--------------------------------------------------------------------------
     | Laravel CORS
     |--------------------------------------------------------------------------
     |

     | allowedOrigins, allowedHeaders and allowedMethods can be set to array('*')
     | to accept any value.
     |
     */
    'supportsCredentials' => false,
    'allowedOrigins' => ['*'],
    'allowedHeaders' => ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // ex : ['Content-Type', 'Accept']
    'allowedMethods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTION'],
    'exposedHeaders' => [],
    'maxAge' => 0,
    'hosts' => [],
];
