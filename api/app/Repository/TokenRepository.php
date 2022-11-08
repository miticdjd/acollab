<?php

namespace App\Repository;

use App\Models\Token;

class TokenRepository
{
    /**
     * Get token by value and type
     * @param string $token
     * @param string $type
     * @return Token|null
     */
    public function getByValueAndType(string $token, string $type): ?Token
    {
        return Token::where('value', $token)
            ->where('type', $type)
            ->first();
    }

    /**
     * Get all languages
     * @param array $data
     * @return Token
     */
    public function create(array $data): Token
    {
        $token = new Token();
        $token->fill($data);
        $token->save();

        return $token;
    }

    /**
     * Get to change default false value to true value
     * @param Token $token
     * @return Token
     */
    public function markAsUsed(Token $token): Token
    {
        $token->is_used = true;
        $token->save();

        return $token;
    }
}
