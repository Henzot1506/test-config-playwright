Feature: Demo Web Shop Basic Functionality

  Scenario: Verify page title
    Given I am on the home page
    Then the page title should be "Demo Web Shop"

  Scenario: Subscribe to newsletter
    Given I am on the home page
    When I enter email "test@example.com" in the newsletter field
    And I click the subscribe button
    Then I should see the success message "Thank you for signing up!"

  Scenario Outline: Verify featured products are displayed
    Given I am on the home page
    Then the featured product "<productName>" should be visible

    Examples:
      | productName             |
      | $25 Virtual Gift Card   |
      |        14.1-inch Laptop |
      | Build your own computer |
      | Simple Computer         |

  Scenario: Navigate to a featured product page
    Given I am on the home page
    When I click on the product "$25 Virtual Gift Card"
    Then I should be redirected to the product page with name "$25 Virtual Gift Card"
