<?php

namespace Database\Seeders;

use App\Models\Sport;
use Illuminate\Database\Seeder;

class SportTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sports = [
            1 => [
                    [
                        'name' => 'Mali fudbal (m)',
                        'number_of_players' => 10,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Basket - ulična košarka',
                        'number_of_players' => 4,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Atletika (sprint 60m)',
                        'number_of_players' => 1,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Ženski mali fudbal',
                        'number_of_players' => 10,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Između dve vatre',
                        'number_of_players' => 9,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Odbojka',
                        'number_of_players' => 12,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Odbojka na pesku',
                        'number_of_players' => 2,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Rukomet',
                        'number_of_players' => 12,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Tenis',
                        'number_of_players' => 1,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Stoni tenis',
                        'number_of_players' => 1,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Šah',
                        'number_of_players' => 1,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Ulična košarka (ž)',
                        'number_of_players' => 4,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Ulična košarka (m)',
                        'number_of_players' => 4,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Odbojka (ž)',
                        'number_of_players' => 12,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Odbojka (m)',
                        'number_of_players' => 12,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Odbojka na pesku (ž)',
                        'number_of_players' => 2,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Odbojka na pesku (m)',
                        'number_of_players' => 2,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Rukomet (ž)',
                        'number_of_players' => 12,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Rukomet (m)',
                        'number_of_players' => 12,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Tenis (ž)',
                        'number_of_players' => 1,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Tenis (m)',
                        'number_of_players' => 1,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Mali fudbal (ž)',
                        'number_of_players' => 10,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Mali fudbal (2010)',
                        'number_of_players' => 10,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Između dve vatre (2012)',
                        'number_of_players' => 9,
                        'is_activated' => true
                    ]
                ],
            2 => [
                    [
                        'name' => 'Muški mali nogomet',
                        'number_of_players' => 10,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Rukomet',
                        'number_of_players' => 12,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Tenis',
                        'number_of_players' => 1,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Stolni tenis',
                        'number_of_players' => 1,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Šah',
                        'number_of_players' => 1,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Ženska ulična košarka',
                        'number_of_players' => 4,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Odbojka na pijesku',
                        'number_of_players' => 2,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Atletika (utrka 60 metara)',
                        'number_of_players' => 1,
                        'is_activated' => false
                    ],
                    [
                        'name' => 'Muška odbojka',
                        'number_of_players' => 12,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Ženski mali nogomet',
                        'number_of_players' => 10,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Graničar',
                        'number_of_players' => 9,
                        'is_activated' => false
                    ],
                    [
                        'name' => 'Muška ulična košarka',
                        'number_of_players' => 4,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Ženska odbojka',
                        'number_of_players' => 12,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Mali nogomet 2009',
                        'number_of_players' => 10,
                        'is_activated' => true
                    ],
                ],
            3 => [
                    [
                        'name' => 'Mali nogomet/fudbal 2006. i mlađi',
                        'number_of_players' => 8,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Rukomet',
                        'number_of_players' => 10,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Tenis',
                        'number_of_players' => 1,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Stolni tenis',
                        'number_of_players' => 1,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Šah',
                        'number_of_players' => 1,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Ulična košarka',
                        'number_of_players' => 4,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Badminton',
                        'number_of_players' => 1,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Odbojka - žene',
                        'number_of_players' => 10,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Atletika (trka 60 metara)',
                        'number_of_players' => 1,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Mali nogomet/fudbal - žene',
                        'number_of_players' => 10,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Između dvije vatre',
                        'number_of_players' => 9,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Odbojka na pijesku',
                        'number_of_players' => 2,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Odbojka - muškarci',
                        'number_of_players' => 10,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Finale',
                        'number_of_players' => 8,
                        'is_activated' => true
                    ],
                    [
                        'name' => 'Mali nogomet/fudbal 2010. i mlađi',
                        'number_of_players' => 8,
                        'is_activated' => true
                    ]
            ]
        ];

        foreach ($sports as $countryId => $countrySports) {
            foreach ($countrySports as $data) {
                $sport = new Sport();
                $sport->country_id = $countryId;
                $sport->fill($data);
                $sport->save();
            }
        }
    }
}
