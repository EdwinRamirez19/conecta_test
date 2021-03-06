<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Client;
class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         User::create([
            'name' => 'Administrador',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('12345'),
            'role'=>'Admin'
        ]);

          User::create([
            'name' => 'Vendedor',
            'email' => 'vendedor@gmail.com',
            'password' => Hash::make('123456'),
            'role'=>'Vendedor'
        ]);

        Client::create([
            'name' => 'edwin ramirez',
            'identification' => '1063178719',
            'mail' => 'edwin@gmail.com',
            'address' => 'lorica',
            
        ]);
    }
}
