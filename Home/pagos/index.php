<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ANDAIA</title>

    <script src="https://www.paypal.com/sdk/js?client-id=AR81Gxh85go9JH4lwBp_5FFcE8cV0-3JNglpjQzMYajiBZZL3x2F4FFHx-hx7AbcDPMYNBOzPZUMAyhJ&currency=MXN"
</head>

<body>
    
<div id="paypal-button-container"></div>

<script>
    paypal.Buttons({
        style:{
            color: 'blue',
            shape: 'pill',
            label: 'pay'
        },
        createOrder: fuction(data.actions){
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: 100 
                    }
                }]
            });
        }
    }).render('#paypal-button-container');
</script>
</body>
</html>