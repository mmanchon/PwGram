<?php
namespace  PwGram\Controller;

//use Silex\Application;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class HelloController{
    public function indexAction(Application $app,Request $request){
        $content=$app['twig']->render('home.twig', array(
            'app' => [
                'name'=>$app['app.name'],
                 'username' => $app['session']->get('username'),
                'img' => $app['session']->get('img')

            ]
        ));
        $response=new Response();
        $response->setStatusCode($response::HTTP_OK);
        $response->headers->set('Content-Type','text/html');
        $response->setContent($content);

        return $response;
       // return $app['home'];
    }
    public function indexSamu(Application $app,Request $request){

        $content=$app['twig']->render('home_samu.twig', array(
            'app' => [
                'name'=>$app['app.name'],
                'username' => $app['session']->get('username'),
                'img' => $app['session']->get('img')

            ],
        ));
        $response=new Response();
        $response->setStatusCode($response::HTTP_OK);
        $response->headers->set('Content-Type','text/html');
        $response->setContent($content);

        return $response;
    }
    public function indexManu(Application $app,Request $request){

        $content=$app['twig']->render('profile_owner.twig', array(
            'app' => [
                'user' => 'Alejandra',
                'name'=>$app['app.name'],
                'img' => $app['session']->get('img')

            ]
        ));
        $response=new Response();
        $response->setStatusCode($response::HTTP_OK);
        $response->headers->set('Content-Type','text/html');
        $response->setContent($content);

        return $response;
    }


    public function addAction(Application $app,$num1,$num2){
        return "the result is: ".$app['calc']->add($num1,$num2);
    }

}