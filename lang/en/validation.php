<?php

return [
    'required' => 'is required',
    'email' => 'must be a valid email address',
    'unique' => 'has already been taken',
    'confirmed' => 'confirmation does not match',
    'min' => [
        'string' => 'must be at least :min characters',
        'numeric' => 'must be at least :min',
    ],
    'max' => [
        'string' => 'must not be greater than :max characters',
        'numeric' => 'must not be greater than :max',
    ],
];