<?php

namespace App\EventListeners;

use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class ApiKeyListener
{
    private $apiKey;

    public function __construct(ParameterBagInterface $params)
    {
        $this->apiKey = $params->get('app.apiKey');
    }

    public function onKernelRequest(RequestEvent $event)
    {
        $request = $event->getRequest();
        $path = $request->getPathInfo();

        if (strpos($path, '/api/') === 0) {
            $providedApiKey = $request->headers->get('X-API-KEY');

            if ($providedApiKey !== $this->apiKey) {
                throw new AccessDeniedHttpException('Invalid API Key', null, 419);
            }
        }
    }
}
