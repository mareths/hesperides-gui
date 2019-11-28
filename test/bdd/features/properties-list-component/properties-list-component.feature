Feature: Modal properties list component

Scenario: Display modal properties list component
  Given an existing module with required and not required properties
  And a platform using this module
  When I open the modal properties list component
  Then the modal properties list component is successfull displayed

Scenario: Display only properties with blank final value
  Given an existing module with properties that have blank and not blank finalValues
  And a platform using this module
  When I open the modal properties list component
  And I click on the switch that display only properties with an empty final value
  Then only the properties with empty finalValue are displayed