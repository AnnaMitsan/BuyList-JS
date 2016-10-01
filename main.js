$(function() {

    var template = $(".row-template").html();
    var $blList = $(".bl-list");
    var $input = $(".addinput");
    var statisticTemplate = $(".left-template").html();
    var $statLeft = $(".bl-left");
    var $statDone = $(".bl-done");
    
    function addOneItem(name) {
        var quantity = 1;
        var $node = $(template);
        var $plus = $node.find(".bl-plus");
        var $minus = $node.find(".bl-minus");
        var $blLabel = $node.find(".bl-label");
        var $delete = $node.find(".bl-delete");
        var $bought = $node.find(".bl-buy");
        var $unBought = $node.find(".bl-notbuy");
        var $productName = $node.find(".bl-product-name");
        var $changeNameInput = $node.find(".bl-change-input");
        
        var $statNode = $(statisticTemplate);        
        var $statProdName = $statNode.find(".bl-left-product-name");
        var $statProdCount = $statNode.find(".bl-left-product-count");
              
        $minus.attr("disabled", true);
        
        
        $productName.text(name);
        $blLabel.text(1);
        
        $statProdName.text(name);
        $statProdCount.text(1);

        function buyClick() {
            $node.addClass("state-bought");
            $node.removeClass("state-not-bought");
            $statNode.remove();
            $statDone.append($statNode);
        }

        function notBuyClick() {
            $node.removeClass("state-bought");
            $node.addClass("state-not-bought");
            $statNode.remove();
            $statLeft.append($statNode);
        }
        
        $productName.click(function() {   
            var $oldName = $productName.text();
            $node.addClass("state-change-name");
            $node.removeClass("state-not-change-name");  
            var $newName = "";
            console.log("old name", $oldName);
            $changeNameInput.val($oldName);
        
            
            $changeNameInput.on("input", function() {
                if ($(this).val().length > 0) {
                    console.log("this name", $(this).val());
                    
                    $newName=$(this).val();
                     console.log("new name", $newName);
                     $productName.text($newName);
                    $statProdName.text($newName);
                }
                else{
                    $productName.text($oldName);
                     $statProdName.text($oldName);
                }
            });
            
            $changeNameInput.focus();        
            $changeNameInput.focusout(function() {
                $node.removeClass("state-change-name");
                $node.addClass("state-not-change-name");
                
            });
        });
        
        function updateNode(node, fn) { node.fadeOut(250, function(){
            fn();
            node.fadeIn(250); });
        }
        

        function plusOne() {
            quantity++;
            if (quantity > 1) {           
            $minus.attr("disabled", false);
            }
            $blLabel.text(quantity);
            $statProdCount.text(quantity);
        }

        function minusOne() {
            quantity--;
            if (quantity === 1) {           
            $minus.attr("disabled", true);
            }
            $blLabel.text(quantity);
            $statProdCount.text(quantity);
        }

        function deleteItem() {
            $node.remove();
            $statNode.remove();
        }

        $bought.click(buyClick);
        $unBought.click(notBuyClick);
        $delete.click(deleteItem);
        $plus.click(plusOne);
        $minus.click(minusOne);     
        

        $node.addClass("state-not-bought");
        $node.addClass("state-not-change-name");
        
        $blList.append($node);
        $statLeft.append($statNode);
    }

    $(".addbutton").click(function() {
        var text = $input.val();
        if (text.length > 0) {
            addOneItem(text);
            $input.val("");
        }
    });
    $(".addinput").keypress(function(e) {
        if (e.which == 13) {
            var text = $input.val();
            if (text.length > 0) {
                addOneItem(text);
                $input.val("");
            }
        }
    });

    addOneItem("Сир");
    addOneItem("Бургер");
    addOneItem("Coca-Cola");
});