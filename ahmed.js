/* slider component */
    // check click events
    document.addEventListener("click", (e) => {
        // slider arrow is pressed
        if(e.target.classList.contains("slider-arrow-right") || e.target.classList.contains("slider-arrow-left")){
            sliderArrow(e.target);
        }
        // slider indicators is pressed
        else if(e.target.classList.contains("item-indicator")){
            sliderIndicators(e.target);
        }
    });
    // when slider arrow is pressed
    function sliderArrow(arrow){
        if(arrow.classList.contains("slider-arrow-right")){
            sliderRight(arrow.parentNode);
        }
        if(arrow.classList.contains("slider-arrow-left")){
            sliderLeft(arrow.parentNode);
        }
    }
    // move slider to right
    function sliderRight(slider){
        // get slider items
        let items = slider.querySelectorAll(".slider-item");
        // get index of active item
        let index = -1;
        items.forEach((e, i) => {
            if(e.classList.contains("active")){
                index = i;
            }
        });
        // move slider
        if(index >= 0){
            if(index < items.length-1){
                if(slider.querySelectorAll(".item-indicator").length > index+1){
                    moveIndicator(slider.querySelectorAll(".item-indicator")[index+1]);
                }else{
                    slider.querySelectorAll(".item-indicator").forEach((e) => {e.classList.remove("active")});
                }
                moveItem(items[index+1], "right");
            }else{
                if(slider.querySelectorAll(".item-indicator").length > 0){
                    moveIndicator(slider.querySelectorAll(".item-indicator")[0]);
                }else{
                    slider.querySelectorAll(".item-indicator").forEach((e) => {e.classList.remove("active")});
                }
                moveItem(items[0], "right");
            }
        }
    }
    // move slider to left
    function sliderLeft(slider){
        // get slider items
        let items = slider.querySelectorAll(".slider-item");
        // get index of active item
        let index = -1;
        items.forEach((e, i) => {
            if(e.classList.contains("active")){
                index = i;
            }
        });
        // move slider
        if(index >= 0){
            if(index > 0){
                if(slider.querySelectorAll(".item-indicator").length > index-1){
                    moveIndicator(slider.querySelectorAll(".item-indicator")[index-1]);
                }else{
                    slider.querySelectorAll(".item-indicator").forEach((e) => {e.classList.remove("active")});
                }
                moveItem(items[index-1]);
            }else{
                if(slider.querySelectorAll(".item-indicator").length > items.length-1){
                    moveIndicator(slider.querySelectorAll(".item-indicator")[items.length-1]);
                }else{
                    slider.querySelectorAll(".item-indicator").forEach((e) => {e.classList.remove("active")});
                }
                moveItem(items[items.length-1], "left");
            }
        }
    }
    // when slider indicators is pressed
    function sliderIndicators(indicator){
        if(!indicator.classList.contains("active")){
            let index = -1;
            // get index
            indicator.parentNode.querySelectorAll(".item-indicator").forEach((e, i) => {
                if(e === indicator){
                    index = i;
                }
            });
            if(index >= 0){
                // move slider
                moveIndicator(indicator);
                moveItem(indicator.parentNode.parentNode.querySelectorAll(".slider-item")[index]);
            }
        }
    }
    // move indicators
    function moveIndicator(indicator){
        // check if slider move or not
        let move = false;
        indicator.parentNode.parentNode.querySelectorAll(".slider-item").forEach((e) => {
            if(e.classList.length > 2){
                move = true;
            }
        });
        if(!move){
            indicator.parentNode.querySelectorAll(".item-indicator").forEach((e) => {e.classList.remove("active")});
            indicator.classList.add("active")
        }
    }
    // move items
    function moveItem(item, direction){
        if(item.parentNode.childElementCount > 1){
            // get last item and indexes
            let lastItem;
            let index = -1;
            let lastIndex = -1;
            item.parentNode.querySelectorAll(".slider-item").forEach((e, i) => {
                if(e.classList.contains("active")){
                    lastItem = e;
                    lastIndex = i;
                }
                if(e === item){
                    index = i;
                }
            });
            // check if last item is not current item
            if(item  !== lastItem){
                // check if the slider item is move or not
                if(lastItem.classList.length === 2){
                    // get user slider duration
                    let duration = "500";
                    if(item.parentNode.parentNode.attributes["slider-duration"]){
                        if(item.parentNode.parentNode.attributes["slider-duration"].value !== ""){
                            duration = item.parentNode.parentNode.attributes["slider-duration"].value;
                        }
                    }
                    // set slider duration
                    item.parentNode.parentNode.style = "--slider-duration: " + duration + "ms";
                    // set direction
                    if(direction !== "right" && direction !== "left"){
                        if(index > lastIndex){
                            direction = "right";
                        }
                        if(lastIndex > index){
                            direction = "left";
                        }
                    }
                    // put classes on slider items
                    lastItem.classList.remove("active");
                    lastItem.classList.add("prev-item", "slider-" + direction);
                    item.classList.add("active", "next-item", "slider-" + direction);
                    setTimeout((e) => {
                        lastItem.classList.remove("active", "prev-item", "slider-" + direction);
                        item.classList.remove("next-item", "slider-" + direction);
                    }, duration);
                }
            }
        }
    }
    // move all slider
    function moveSlider(slider, index, direction){
        // check if index in range of items
        if(index >= 0 && index < sliderItemsNum(slider)){
            // move slider
            if(sliderIndicatorsNum(slider) > index){
                moveIndicator(slider.querySelectorAll(".item-indicator")[index]);
            }else{
                slider.querySelectorAll(".item-indicator").forEach((e) => {e.classList.remove("active")});
            }
            moveItem(slider.querySelectorAll(".slider-item")[index], direction);
        }
    }
    // slider items number
    function sliderItemsNum(slider){
        return slider.querySelectorAll(".slider-item").length;
    }
    // slider indicators number
    function sliderIndicatorsNum(slider){
        return slider.querySelectorAll(".item-indicator").length;
    }
/* slider component */
/* ################################################## */