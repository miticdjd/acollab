<?php

namespace App\Services\User;

class Colors
{
    const ALL_COLORS = [
        [
            'background' => '#dce9fe',
            'color' => '#1870F4'
        ],
        [
            'background' => '#fbdcdc',
            'color' => '#F41818'
        ],
        [
            'background' => '#fdefdc',
            'color' => '#F48F18'
        ],
        [
            'background' => '#fdf4dc',
            'color' => '#F4B618'
        ],
        [
            'background' => '#e5f1de',
            'color' => '#52981B'
        ],
        [
            'background' => '#daf3ef',
            'color' => '#09AF91'
        ],
        [
            'background' => '#f4e6f3',
            'color' => '#B462B6'
        ],
        [
            'background' => '#eee5e5',
            'color' => '#8C5151'
        ],
        [
            'background' => '#e8e8f4',
            'color' => '#6B65B0'
        ],
        [
            'background' => '#f0f3e3',
            'color' => '#9BAF4A'
        ],
        [
            'background' => '#f8dced',
            'color' => '#D4218D'
        ],
        [
            'background' => '#d9ebee',
            'color' => '#007A8A'
        ],
        [
            'background' => '#e2e1ea',
            'color' => '#3D3C72'
        ],
        [
            'background' => '#f6dde3',
            'color' => '#C51F3D'
        ],
        [
            'background' => '#e2f1fc',
            'color' => '#34A1F0'
        ],
        [
            'background' => '#dde8f3',
            'color' => '#126CAD'
        ],
        [
            'background' => '#e8e8e8',
            'color' => '#696969'
        ],
        [
            'background' => '#d9e7da',
            'color' => '#005C09'
        ],
        [
            'background' => '#e8d8f4',
            'color' => '#6D00B0'
        ],
        [
            'background' => '#def6e7',
            'color' => '#21B95E'
        ]
    ];

    /**
     * Generate random combination
     * @return array
     */
    public static function generateRandomCombination(): array
    {
        return self::ALL_COLORS[mt_rand(0, count(self::ALL_COLORS) - 1)];
    }
}
