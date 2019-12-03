Feature: Modal properties list component

Scenario: Display modal properties list component
  Given an existing module with required and not required properties
  And a platform with this module
  When I open the modal properties list component
  Then the modal properties list component is successfull displayed

Scenario: Display only properties with blank final value
  Given an existing template with this content
  """
    {{property_1}}
    {{property_2 | @default 45}}
    {{property_3}}
  """
  And an existing module with this template
  And a platform with this module
  When I open the modal properties list component
  And I click on the switch that display only properties with an empty final value
  Then only the properties with empty finalValue are displayed

Scenario: Filter the properties for display only the properties that match key filter
  Given an existing template with this content
  """
    {{property_1}}
    {{property_2 | @default 45}}
    {{application-1}}
    {{platform-1}}
    {{platform-property}}
  """
  And an existing module with this template
  And a platform with this module
  When I open the modal properties list component
  And I click on the field filter properties by key to input key filter 'prop'
  Then only the properties that match the key filter are displayed
