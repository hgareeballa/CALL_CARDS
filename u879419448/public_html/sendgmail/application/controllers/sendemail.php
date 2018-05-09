<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sendemail extends CI_Controller {

	public function index($test)
	{
		echo " WELCOME BOSS Sendemail!";	
		echo "<br>";
		echo $test;	
		//log_message('error', "PASS: EMAIL");
	} // index

	public function sendgmail(){
			// create a new cURL resource
			$ch = curl_init();
			// set URL and other appropriate options
			$pin="12345-12356-12387";
			$email="sudane@gmail.com";
			curl_setopt($ch, CURLOPT_URL, "http://myRaseed.com/sendgmail/index.php/sendemail/sendm/$email/$pin/");
			curl_setopt($ch, CURLOPT_HEADER, 0);
			// grab URL and pass it to the browser
			curl_exec($ch);
			// close cURL resource, and free up system resources
			curl_close($ch);
		echo "Done";
	}// get page

	public function sendm($to_mail,$msg){
		
		    $this->load->library('email');
            $this->email->set_newline("\r\n"); /* for some reason it is needed */
            $this->email->from('myraseed.cards@gmail.com', 'myRaseed.com');

            $this->email->to($to_mail);
            $this->email->subject('Your Zain Card 50SDG Serial');
            //$this->email->message("<br><h1><b>".$msg."<br><br> <a href='http://myraseed.com'> <img src='http://myraseed.com/img/myRaseed.png' alt='www.mRaseed.com' width='500' height=''> <br> <a href='http://myRaseed.com'>www.myRaseed.com</a>");

            $this->email->message("<br><h1><b>Your Card PIN Number is:".$msg);
            if($this->email->send())
            {            
            log_message('error', "PASS: Email=".$to_mail." MSG=".$msg);
            }
            else
            {                    
            log_message('error', "FAIL: Email=".$to_mail." >>>>EMAIL FAIL");
            }
   }// sendm
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */