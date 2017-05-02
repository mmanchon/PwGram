<?php
/**
 * Created by PhpStorm.
 * User: Xps_Sam
 * Date: 19/04/2017
 * Time: 16:07
 */

namespace PwGram\Model;
use PDO;

class Profile
{
    private $request;
    private $app;

    public function __construct($request,$app)
    {
        $this->request = $request;
        $this->app = $app;
        return $this;
    }
    public function getInfo(){
        $db = new PDO('mysql:host=localhost;dbname=pwgram', "root", "gabriel");
        $id = $this->app['session']->get('id');
        $stmt = $db->prepare('SELECT username,img_path FROM user WHERE  id=?;');
        $stmt->bindParam(1, $id, \PDO::PARAM_STR);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        return json_encode($result);
    }
}