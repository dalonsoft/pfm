<?php

return [
    'required' => 'es requerido',
    'email' => 'debe ser una dirección de correo válida',
    'unique' => 'ya ha sido tomado',
    'confirmed' => 'la confirmación no coincide',
    'min' => [
        'string' => 'debe tener al menos :min caracteres',
        'numeric' => 'debe ser al menos :min',
    ],
    'max' => [
        'string' => 'no debe tener más de :max caracteres',
        'numeric' => 'no debe ser mayor que :max',
    ],
];