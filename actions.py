# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/core/actions/#custom-actions/


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List, Union, Optional
from rasa_sdk import Action
from rasa_sdk import Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormAction
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []

class ActionHelloWorldProgram(Action):

    def name(self) -> Text:
        return "action_hello_world_program"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text="Custom Action:  Hello World! ")

        return []


class LeadFormFirstPart(FormAction):
    """Example of a custom form action"""

    def name(self) -> Text:
        """Unique identifier of the form"""

        return "lead_form_p1"

    @staticmethod
    def required_slots(tracker: Tracker) -> List[Text]:
        """A list of required slots that the form has to fill"""
        return ["requirement", "mockup"]

    def slot_mappings(self) -> Dict[Text, Union[Dict, List[Dict]]]:
        """A dictionary to map required slots to
            - an extracted entity
            - intent: value pairs
            - a whole message
            or a list of them, where a first match will be picked"""
        return {
            "requirement": [
                self.from_text(),
            ],
            "mockup": [
                self.from_text(),
            ],
        }

    def submit(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict]:
        """Define what the form has to do
            after all required slots are filled"""

        # utter submit template
        dispatcher.utter_template("utter_urlAvailable", tracker)
        return []


class LeadFormSecondPart(FormAction):
    """Example of a custom form action"""

    def name(self) -> Text:
        """Unique identifier of the form"""

        return "lead_form_p2"

    @staticmethod
    def required_slots(tracker: Tracker) -> List[Text]:
        """A list of required slots that the form has to fill"""
        return ["url"]

    def slot_mappings(self) -> Dict[Text, Union[Dict, List[Dict]]]:
        """A dictionary to map required slots to
            - an extracted entity
            - intent: value pairs
            - a whole message
            or a list of them, where a first match will be picked"""
        return {
            "url": [
                self.from_text(),
            ],
        }

    def submit(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict]:
        """Define what the form has to do
            after all required slots are filled"""
            
        return []


class LeadFormThirdPart(FormAction):
    """Example of a custom form action"""

    def name(self) -> Text:
        """Unique identifier of the form"""

        return "lead_form_p3"

    @staticmethod
    def required_slots(tracker: Tracker) -> List[Text]:
        """A list of required slots that the form has to fill"""
<<<<<<< HEAD
        return ["name" ]
=======
        return ["name", "email", "phone" ]
>>>>>>> 1753855ff2bcd229cc06a2f59c3f99d22a6f43b2

    def slot_mappings(self) -> Dict[Text, Union[Dict, List[Dict]]]:
        """A dictionary to map required slots to
            - an extracted entity
            - intent: value pairs
            - a whole message
            or a list of them, where a first match will be picked"""
        return {
            "name": [
                self.from_text(),
<<<<<<< HEAD
            ],                     
=======
            ],
            "email": [
                self.from_text(),
            ],
            "phone": [
                self.from_text(),
            ],            
>>>>>>> 1753855ff2bcd229cc06a2f59c3f99d22a6f43b2
            
        }
    
    def submit(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict]:
        """Define what the form has to do
            after all required slots are filled"""

<<<<<<< HEAD
       
        dispatcher.utter_template("utter_lead_q2", tracker)
=======
        # utter submit template
        dispatcher.utter_template("utter_lead_q2", tracker)
        dispatcher.utter_template("utter_lead_q3", tracker)
>>>>>>> 1753855ff2bcd229cc06a2f59c3f99d22a6f43b2
        dispatcher.utter_template("utter_lead_q5", tracker)        
        
        return []        


class LeadFormThirdPart(FormAction):
    """Example of a custom form action"""

    def name(self) -> Text:
        """Unique identifier of the form"""

        return "lead_form_p4"

    @staticmethod
    def required_slots(tracker: Tracker) -> List[Text]:
        """A list of required slots that the form has to fill"""
        return ["manufacturer", "Hyundai","i20", "sport","12_Inc"] 

    def slot_mappings(self) -> Dict[Text, Union[Dict, List[Dict]]]:
        """A dictionary to map required slots to
            - an extracted entity
            - intent: value pairs
            - a whole message
            or a list of them, where a first match will be picked"""
        return {
            "manufacturer": [
                self.from_text(),
            ],
            "Hyundai": [
                self.from_text(),
            ],
            "i20": [
                self.from_text(),
            ],
            "sport": [
                self.from_text(),
            ],
            "12_Inc": [
                self.from_text(),
            ],
            
        }

    def submit(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict]:
        """Define what the form has to do
            after all required slots are filled"""

<<<<<<< HEAD
        
=======
        # utter submit template
>>>>>>> 1753855ff2bcd229cc06a2f59c3f99d22a6f43b2
        dispatcher.utter_template("utter_lead_q6", tracker)
        
        return []        
