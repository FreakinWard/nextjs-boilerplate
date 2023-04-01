Feature: Health page

  Background:
    When I navigate to the health page

  Scenario: Shows health items
    When The title "Health Check" is shown
    Then health item "Name" is "nextjs-boilerplate"
    And health item "BuildNumber" is "set-in-ci-pipeline"
    And health item "Status" is "ok"
