<?php

namespace App\Services\Token;

use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Models\User;
use App\Repository\TokenRepository;
use App\Services\Token\Exception\InvalidTokenType;
use App\Models\Token as TokenModel;

class Token
{
    /**
     * Length of token
     */
    public const TOKEN_CHAR_LENGTH = 12;

    /**
     * @var Type
     */
    private Type $type;

    /**
     * @var TokenRepository
     */
    private TokenRepository $tokenRepository;

    /**
     * Initialize new token repository.
     * @param Type $type
     * @param TokenRepository $tokenRepository
     */
    public function __construct(Type $type, TokenRepository $tokenRepository)
    {
        $this->type = $type;
        $this->tokenRepository = $tokenRepository;
    }

    /**
     * Get token by it's value and type
     * @param string $token
     * @param string $type
     * @return TokenModel|null
     * @throws InvalidTokenType
     */
    public function get(string $token, string $type): ?TokenModel
    {
        if (!$this->type->isValidType($type)) {
            throw new InvalidTokenType();
        }

        return $this->tokenRepository->getByValueAndType($token, $type);
    }

    /**
     * Is expired token
     * @param TokenModel $token
     * @return bool
     */
    public function isExpired(TokenModel $token): bool
    {
        $now = Carbon::now();

        if ($now > $token->expire_at) {
            return true;
        }

        return false;
    }

    /**
     * Check if token is used
     * @param TokenModel $token
     * @return bool
     */
    public function isUsed(TokenModel $token): bool
    {
        return $token->is_used;
    }

    /**
     * Mark token as used
     * @param TokenModel $token
     * @return TokenModel
     */
    public function markAsUsed(TokenModel $token): TokenModel
    {
        return $this->tokenRepository->markAsUsed($token);
    }

    /**
     * Generate new token
     * @param User $user
     * @param string $type
     * @return TokenModel
     * @throws InvalidTokenType
     */
    public function generate(User $user, string $type): TokenModel
    {
        if (!$this->type->isValidType($type)) {
            throw new InvalidTokenType();
        }

        $expireAt = Carbon::now()->addDay();

        return $this->tokenRepository->create([
            'user_id' => $user->id,
            'type' => $type,
            'value' => Str::random(self::TOKEN_CHAR_LENGTH),
            'expire_at' => $expireAt
        ]);
    }
}
