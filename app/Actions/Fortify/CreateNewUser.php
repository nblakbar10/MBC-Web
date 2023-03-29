<?php

namespace App\Actions\Fortify;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Laravel\Jetstream\Jetstream;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array  $input
     * @return \App\Models\User
     */
    public function create(array $input)
    {

        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'phone_number' => ['required', 'string', 'max:255', 'unique:users'],
            'password' => $this->passwordRules(),
            'terms' => Jetstream::hasTermsAndPrivacyPolicyFeature() ? ['accepted', 'required'] : '',
            'NIM' => $input['role'] == 'mahasiswa' ? ['string', 'max:255', 'unique:user_profiles'] : '',
            'NIDN' => $input['role'] == 'dosen' ? ['string', 'max:255', 'unique:user_profiles'] : '',
            'NIP_NIPH' => $input['role'] == 'dosen' ? ['string', 'max:255', 'unique:user_profiles'] : '',
        ])->validate();

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'phone_number' => $input['phone_number'],
            'password' => Hash::make($input['password']),
        ])->assignRole($input['role']);
        if($input['role'] == 'mahasiswa'){
            $user->userProfile()->create([
                'NIM' => $input['NIM'],
            ]);
        }else if($input['role'] == 'dosen'){
            $user->userProfile()->create([
                'NIDN' => $input['NIDN'],
                'NIP_NIPH' => $input['NIP_NIPH'],
            ]);
        }  
        return $user;
    }
}
