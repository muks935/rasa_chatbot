<?php
     //$process_list = shell_exec('sudo lsof -i:5002');
exec('sudo lsof -i:5002', $output, $return);
//echo $output."==". $return;
//echo '<pre>'; print_r($output); echo '</pre>';
// Return will return non-zero upon an error
if (!$return) {
    echo false;
} else {
     $output = shell_exec('cd /var/www/html/rasa_chatboat');

	 $output1 = shell_exec('source activate chatbot');
	
	 $output2 = shell_exec('rasa x');
	 
	 echo true;
}
	
	 ///usr/bin/php /var/www/html/rasa_chatboat/UI/start_chat.php
?>
