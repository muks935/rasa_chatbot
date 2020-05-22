## happy path
* greet
    - utter_greet

* Recommend Tyres
    - utter_ans

## chat_manufacturer
* manufacturer
  - lead_form_p4
  - form{"name":"lead_form_p4"}
  - slot{"requested_slot":"name"} 
* I'm intrested  
  - lead_form_p3
  - form{"name":"lead_form_p3"}
  - slot{"requested_slot":"name"}     


## Brand_selection
* Brand  
  - utter_Brand_name

## chat_hyundai
* Hyundai
  - utter_ask_Hyundai 



## chat_i20
* i20
  - utter_ask_i20 

  
## chat_Sports
* sport
  - utter_ask_sport

 
  
## chat_12_inc
* 12_Inc
  - utter_ask_12_Inc   
   
* Details
    - lead_form_p4
    - form{"name":"lead_form_p4"}
    - slot{"requested_slot":"name"} 

## chat_I'm intrested
* I'm intrested
    - lead_form_p3
    - form{"name":"lead_form_p3"}
    - slot{"requested_slot":"name"}     

## chat_maruti
* Maruti
  - utter_Maruti

## chat_Toyota
* Toyota
  - utter_Toyota

## chat_TaTa
* TaTa
  - utter_TaTa

## chat_Suzuki
* Suzuki
  - utter_Suzuki

## chat_Honda  
* Honda
  - utter_Honda



## chat_i10
* i10
  - utter_i10  

## chat_Verna
* Verna
  - utter_Verna 

## chat_Creta
* Creta
  - utter_Creta  
  


## chat_Megna
* Megna
  - utter_Megna
  

## chat_Asta
* Asta
  - utter_Asta
  
  


## chat_13_inc
* 13_Inc
  - utter_13_Inc    
   
* I'm intrested
    - lead_form_p3
    - form{"name":"lead_form_p3"}
    - slot{"requested_slot":"name"}  


## chat_14_inc
* 14_Inc
  - utter_14_Inc    
   
* I'm intrested
    - lead_form_p3
    - form{"name":"lead_form_p3"}
    - slot{"requested_slot":"name"}           
       
## accept
    
* accept
    - lead_form_p3
    - form{"name": "lead_form_p3"}
    - form{"name": null}
    - utter_lead_q3
    - utter_lead_q4
    - utter_lead_q5
    - lead_form_p4
    - form{"name": "lead_form_p4"}
    - form{"name": null}
    - utter_lead_q6
    - utter_lead_q7

## combined begin without url
* greet
    - utter_greet
    
* begin_lead
    - utter_lead_q1
    - lead_form_p1
    - form{"name": "lead_form_p1"}
    - form{"name": null}
* reject
    - lead_form_p3
    - form{"name": "lead_form_p3"}
    - form{"name": null}
    - utter_lead_q3
    - utter_lead_q4
    - utter_lead_q5  
    - lead_form_p4
    - form{"name": "lead_form_p4"}
    - form{"name": null}
    - utter_lead_q6
    - utter_lead_q7
    
  
## say goodbye
* goodbye  