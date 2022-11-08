<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Repository\TokenRepository;
use App\Repository\UserRepository;
use App\Services\Auth\Exception\UserCantBeFoundException;
use App\Services\Mailer\Mailer;
use App\Services\Token\Exception\InvalidTokenType;
use App\Services\Token\Exception\TokenHasBeenUsed;
use App\Services\Token\Exception\TokenHasExpired;
use App\Services\Token\Exception\TokenNotFound;
use App\Services\Token\Token;
use App\Services\Token\Type as TokenType;

class ForgottenPassword
{
    /**
     * @var Token
     */
    private Token $token;

    /**
     * @var Mailer
     */
    private Mailer $mailer;

    /**
     * @var UserRepository
     */
    private UserRepository $userRepository;

    /**
     * @var TokenRepository
     */
    private TokenRepository $tokenRepository;

    /**
     * Authenticate constructor.
     * @param Token $token
     * @param Mailer $mailer
     * @param UserRepository $userRepository
     */
    public function __construct(Token $token, Mailer $mailer, UserRepository $userRepository) {
        $this->token = $token;
        $this->mailer = $mailer;
        $this->userRepository = $userRepository;
    }

    /**
     * Detect user and initialize forgotten password
     * @param string $email
     * @return User
     * @throws UserCantBeFoundException
     * @throws InvalidTokenType
     */
    public function init(string $email): User
    {
        $user = $this->userRepository->getActiveUserByEmail($email);

        if (!$user) {
            throw new UserCantBeFoundException();
        }

        $token = $this->token->generate($user, TokenType::TYPE_FORBIDDEN_PASSWORD);
        $this->mailer->resetPassword($user, $token->value);

        return $user;
    }

    /**
     * Reset password of a user
     * @param string $token
     * @param string $password
     * @return User
     * @throws InvalidTokenType
     * @throws TokenHasExpired
     * @throws TokenNotFound
     * @throws TokenHasBeenUsed
     */
    public function reset(string $token, string $password): User
    {
        $token = $this->token->get($token, TokenType::TYPE_FORBIDDEN_PASSWORD);

        if (!$token) {
            throw new TokenNotFound();
        }

        if ($this->token->isExpired($token)) {
            throw new TokenHasExpired();
        }

        if ($this->token->isUsed($token)) {
            throw new TokenHasBeenUsed();
        }

        /** @var User $user */
        $user = $token->user;
        $this->userRepository->updatePassword($user, $password);
        $this->token->markAsUsed($token);

        return $user;
    }
}
