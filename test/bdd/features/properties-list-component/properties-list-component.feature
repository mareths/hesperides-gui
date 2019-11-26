Feature: Modal properties list component

Scenario: Display modal properties list component
  Given an existing module with required and not required properties
  And a platform using this module
  When I open the modal properties list component
  Then the modal properties list component is successfull displayed