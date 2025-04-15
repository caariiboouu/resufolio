# 2. Sales

## Outline
This role is responsible for processing sales transactions during the event. You'll be checking if the patron has a payment on file to process or if they'll be paying with their card.

## Initial State
The main navigation on the app has 'Checkout' as the first item, you'll be operating out of this interface. Library will show a list of the available items to sell.

## Making a Sale
Start by selecting the item, reviewing the sale, and then asking the patron their name so that you can assign them to the transaction. Once selected you'll see a variety of payment options. One will state if their payment card is on file. If it is, use that unless specified not to. 

<div class="img-grid">
  <a href="#lightbox-sale-1">
    <img src="IMG_4461.PNG" alt="New Sale Screen">
  </a>
  <a href="#lightbox-sale-2">
    <img src="IMG_4462.PNG" alt="Payment Methods">
  </a>
  <a href="#lightbox-sale-3">
    <img src="IMG_4463.PNG" alt="Processing Payment">
  </a>
</div>

<!-- Lightboxes -->
<div id="lightbox-sale-1" class="lightbox">
  <img src="IMG_4461.PNG" alt="New Sale Screen">
  <a href="#" class="close">×</a>
  <a href="#lightbox-sale-3" class="nav prev">‹</a>
  <a href="#lightbox-sale-2" class="nav next">›</a>
</div>
<div id="lightbox-sale-2" class="lightbox">
  <img src="IMG_4462.PNG" alt="Payment Methods">
  <a href="#" class="close">×</a>
  <a href="#lightbox-sale-1" class="nav prev">‹</a>
  <a href="#lightbox-sale-3" class="nav next">›</a>
</div>
<div id="lightbox-sale-3" class="lightbox">
  <img src="IMG_4463.PNG" alt="Processing Payment">
  <a href="#" class="close">×</a>
  <a href="#lightbox-sale-2" class="nav prev">‹</a>
  <a href="#lightbox-sale-1" class="nav next">›</a>
</div>

## Processing the Payment
Once you've entered the sale amount:

1. If using a new card:
   - Take the patron's card, tap or insert it in to the chip reader
   - The terminal will process the payment automatically
   - Once approved, remove their card

2. If using card on file:
   - The terminal will automatically generate and email a receipt if an email address is associated with the payment method.

## Complete
After the payment is processed successfully, thank the patron and hand them their purchased items if applicable.