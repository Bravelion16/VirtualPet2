class Food{
    constructor(){
        this.foodStock=0;
        this.lastFed;
        this.image=loadImage('images/Milk.png');
    }
    display(MilkX,MilkY){
        var x=100,y=100;
        imageMode(CENTER);
        image(this.image,MilkX,MilkY,100,100);
        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=100;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }
    updateFoodStock(){
        this.foodStock=foodStock;
    }
    getFoodStock(){
        return this.foodStock;
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
    }
    getFedTime(){
        this.lastFed=lastFed;
    }
}