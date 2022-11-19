export default class GameManager extends Laya.Script {
    // 定义二维数组
    // numberArr: Array<Array<number>>;
    // cardArr: Array<Array<Laya.Image>>;
    // downPos: Laya.Point = new Laya.Point;
    // list = new Laya.List();

    /** @prop {name: list, tips:"获取单元格",type:node} */
    list = null;

    /** @prop {name: txt_Score, tips:"游戏得分",type:node} */    
    txt_Score = null;

    score:number = 0;
    numberArr = new Array(4); 
    cardArr = new Array(4);
    downPos = new Laya.Point(0,0);
    gameOver:boolean = false;

    // gameOver:boolean;
    // txt_Score: Laya.Stage;  // todo 等待转换ts语法修改
    constructor() {
        super();




        
    }

    onAwake(): void {
        console.log(Laya.stage);
        // 初始化二维数组
        for(let i=0; i<4; i++) {
            this.numberArr[i] = new Array<number>(4);
            for(let j=0; j<4; j++ ) {
                this.numberArr[i][j] = 0;
            }
        }

        for(let i=0; i<4; i++) {
            this.cardArr[i] = new Array<Laya.Image>(4);
            for(let j=0; j<4; j++) {
                this.cardArr[i][j] = null;
            }
        }

        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.on("Restart", this, this.Restart);

        this.LoadTexture();
    }

    AddScore(value:number):void {
        this.score += value;
        this.txt_Score.text = this.score;
    }

    /**
     * 重新游戏
     */
    Restart():void {
        this.gameOver = false;
        for(let i=0; i<4; i++) {
            this.numberArr[i] = new Array<number>(4);
            for(let j=0; j<4; j++ ) {
                this.numberArr[i][j] = 0;
            }
        }

        for(let i=0; i<4; i++) {
            this.cardArr[i] = new Array<Laya.Image>(4);
            for(let j=0; j<4; j++) {
                if(this.cardArr[i][j] != null) {
                    this.cardArr[i][j].destroy();
                    this.cardArr[i][j] = null;
                }
            }
        }
        this.CreateNumberCard();
        this.CreateNumberCard();
    }

    mouseDown() {
        this.downPos.x = Laya.stage.mouseX;
        this.downPos.y = Laya.stage.mouseY;
    }

    mouseUp() {
        if(this.gameOver)return;
        var diffX: number = Laya.stage.mouseX - this.downPos.x;
        var diffY: number = Laya.stage.mouseY - this.downPos.y;

        if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)){
            if (this.IsMoveLeft()) {
                this.MoveLeft();
                this.CreateNumberCard();
                console.log("left");
            }
        }

        if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)){
            if (this.IsMoveRight()) {
                this.MoveRight();
                this.CreateNumberCard();
                console.log("right");
            } 
            else 
            {
                console.log("cant right");
            }
        }

        if (diffY < 0 && Math.abs(diffX) < Math.abs(diffY)){

            console.log("up");
        }

        if (diffY > 0 && Math.abs(diffX) < Math.abs(diffY)){
            if (this.IsMoveDown()) {
                this.MoveDown();
                this.CreateNumberCard();
                console.log("down");    
            }
        }

        Laya.timer.once(10000, this, function(){Laya.stage.event("gameove");});
        // this.gameOver = true;
    }

    /**
     * 遍历每一行的倒数第二列，是否有非零值（IDcard），再检测非零格右边是否满足移动条件；
     * @returns 返回true，则可以向右移动；false，则不能；
     */
    IsMoveRight(): boolean {
        for (let i:number = 3; i>=0; i--) {
            for (let j:number = 2; j>=0; j--) {
                if (this.numberArr[i][j] != 0) {
                    if (this.numberArr[i][j+1] == 0 || this.numberArr[i][j+1] == this.numberArr[i][j]){
                        return true
                    }
                }
            }
        }
        return false;
    }

    /**
     * 逻辑和IsMoveLeft相同
     * @returns 
     */
    IsMoveLeft(): boolean {
        for (let i:number = 3; i>=0; i--) {
            for (let j:number = 1; j<=3; j++) {
                if (this.numberArr[i][j] != 0) {
                    if (this.numberArr[i][j-1] == 0 || this.numberArr[i][j-1] == this.numberArr[i][j]){
                        return true
                    }
                }
            }
        }
        return false;
    }

    IsMoveDown(): boolean {
        for (let j:number = 3; j>=0; j--) {
            for (let i:number = 2; i>=0; i--) {
                if (this.numberArr[i][j] != 0) {
                    if (this.numberArr[i][j+1] == 0 || this.numberArr[i+1][j] == this.numberArr[i][j]){
                        return true
                    }
                }
            }
        }
        return false;
    }
    
    /**
     * i 是行，j是列
     */
    MoveRight(): void {
        for (let i:number = 3; i>=0; i--) {
            for (let j:number = 2; j>=0; j--) {
                if (this.numberArr[i][j] != 0) {
                    for ( let k:number = 3; k>j; k--) {
                        // 交换处理
                        if (this.numberArr[i][k] == 0 && this.IsMoveRightMid(i, j, k)) 
                        {
                            this.Horizontal_Func1(i, j, k); 
                            continue;
                        }
                        // 合并处理
                        if (this.numberArr[i][k] == this.numberArr[i][j] && this.IsMoveRightMid(i, j, k))
                        {
                            this.Horizontal_Func2(i, j, k);
                        }
                    }
                }
            }
        }
    }

    MoveLeft(): void {
        for (let i:number = 3; i>=0; i--) {
            for (let j:number = 0; j<=3; j++) {
                if (this.numberArr[i][j] != 0) {
                    for ( let k:number = 0; k<j; k++) {
                        // 交换处理
                        if (this.numberArr[i][k] == 0 && this.IsMoveRightMid(i, j, k)) 
                        {
                            this.Horizontal_Func1(i, j, k);
                            continue;
                        }
                        // 合并处理
                        if (this.numberArr[i][k] == this.numberArr[i][j] && this.IsMoveRightMid(i, j, k))
                        {
                            this.Horizontal_Func2(i, j, k);
                        }
                    }
                }
            }
        }
    }

    /**
     * 向下移动
     */
    MoveDown(): void {
        console.log("arr:", this.numberArr);
        for (let j:number = 3; j>=0; j--) {
            for (let i:number = 0; i<=3; i++) {
                if (this.numberArr[i][j] != 0) {
                    for ( let k:number = 3; k>i; k--) {
                        // 交换处理  k是行
                        if (this.numberArr[k][j] == 0 && this.IsMoveDownMid(j, i, k)) 
                        {
                            if (this.cardArr[i][j] != null)
                            {
                                this.cardArr[k][j] = this.cardArr[j][i];
                                this.cardArr[i][j] = null;
                                var point: Laya.Point = this.GetGlobalPos(k*4+j);
                                Laya.Tween.to(this.cardArr[k][j], {x: point.x+77, y:point.y+77}, Math.abs(point.x - this.cardArr[k][j].x)/10);
                            }
                            this.numberArr[k][j] = this.numberArr[i][j];
                            this.numberArr[i][j] = 0;
                            continue;
                        }
                        // 合并处理
                        if (this.numberArr[k][j] == this.numberArr[i][j] && this.IsMoveDownMid(i, j, k))
                        {
                            this.numberArr[k][j]*=2;
                            this.numberArr[i][j] = 0;
                            if (this.cardArr[i][j] != null && this.cardArr[k][j] != null) {
                                this.cardArr[k][j].destroy();
                                this.cardArr[k][j] = this.cardArr[i][j];
                                this.cardArr[i][j] = null;
                                // 改变[i][j]的数字图片
                                var point = this.GetGlobalPos(k*4+j);
                                Laya.Tween.to(this.cardArr[k][j], {x:point.x+77, y:point.y+77}, Math.abs(point.x - this.cardArr[k][j].x)/10, null, 
                                Laya.Handler.create(this, this.ChangeImage, [k, j]));
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * 替换图片资源
     * @param row 
     * @param col 
     */
    ChangeImage (row:number, col:number){
        console.log("numberArr[row][col]:", this.numberArr[row][col]);  // this.numberArr[row][col] 返回的数值是正确的
        this.cardArr[row][col].skin = Laya.loader.getRes("images/2048Atlas_" + this.numberArr[row][col] + ".png");   // 返回的图片不对，或者没有返回图片
        // Laya.stage.addChild(this.cardArr[row][col]);
        console.log(this.cardArr[row][col]);
    }

    /**
     * 判断两个数字之间是否包含其他数字；true则是不含其他数字
     * @param row 行的坐标
     * @param j  遍历的index
     * @param k 遍历的宽度
     */
    IsMoveRightMid(row:number, j:number ,k:number ): boolean {
        for ( let i:number = j+1; i<k; i++) {
            if (this.numberArr[row][i] != 0) {
                return false
            }
        }
        return true
    }

    IsMoveLeftMid(row:number, j:number ,k:number ): boolean {
        for ( let i:number = j-1; i>k; i--) {
            if (this.numberArr[row][i] != 0) {
                return false
            }
        }
        return true
    }

    IsMoveDownMid(row:number, j:number ,k:number ): boolean {
        // 这个循环需要注意
        for ( let i:number = row+1; i<k; i++) {
            if (this.numberArr[i][j] != 0) {
                return false
            }
        }
        return true
    }

    Horizontal_Func1(i:number, j:number, k:number): void {
        if (this.numberArr[i][k] == 0 && this.IsMoveRightMid(i, j, k)) 
        {
            if (this.cardArr[i][j] != null)
            {
                this.cardArr[i][k] = this.cardArr[i][j];
                this.cardArr[i][j] = null;
                var point: Laya.Point = this.GetGlobalPos(i*4+k);
                Laya.Tween.to(this.cardArr[i][k], {x: point.x+77, y:point.y+77}, Math.abs(point.x - this.cardArr[i][k].x));
            }
        this.numberArr[i][k] = this.numberArr[i][j];
        this.numberArr[i][j] = 0;
        }
    }

    Horizontal_Func2(i:number, j:number, k:number): void {
        this.numberArr[i][k]*=2;
        this.numberArr[i][j] = 0;
        if (this.cardArr[i][k] != null && this.cardArr[i][j] != null) {
            this.cardArr[i][k].destroy();
            this.cardArr[i][k] = this.cardArr[i][j];
            this.cardArr[i][j] = null;
            // 改变[i][j]的数字图片
            var point = this.GetGlobalPos(i*4+k);
            Laya.Tween.to(this.cardArr[i][k], {x:point.x+77, y:point.y+77}, Math.abs(point.x - this.cardArr[i][k].x)/10, null, 
            Laya.Handler.create(this, this.ChangeImage, [i, k]));
        }
    }
    
    LoadTexture() {
        var resArr: Array<{url: string, type: string}> = [
            {url:"images/2048Atlas_2.png", type: Laya.Loader.IMAGE},
            {url:"images/2048Atlas_4.png", type: Laya.Loader.IMAGE},
            {url:"images/2048Atlas_8.png", type: Laya.Loader.IMAGE},
            {url:"images/2048Atlas_16.png", type: Laya.Loader.IMAGE},
            {url:"images/2048Atlas_32.png", type: Laya.Loader.IMAGE},
            {url:"images/2048Atlas_64.png", type: Laya.Loader.IMAGE},
            {url:"images/2048Atlas_128.png", type: Laya.Loader.IMAGE},
            {url:"images/2048Atlas_256.png", type: Laya.Loader.IMAGE},
            {url:"images/2048Atlas_512.png", type: Laya.Loader.IMAGE},
            {url:"images/2048Atlas_1024.png", type: Laya.Loader.IMAGE},
            {url:"images/2048Atlas_2048.png", type: Laya.Loader.IMAGE},
            {url:"images/2048Atlas_4096.png", type: Laya.Loader.IMAGE},
            {url:"images/2048Atlas_8192.png", type: Laya.Loader.IMAGE},
        ];
        Laya.loader.load(resArr, Laya.Handler.create(this, function(result: boolean){
            this.CreateNumberCard();
            this.CreateNumberCard();
        }));
    }


    /**
     * 生成卡片
     * @returns 
     */
    CreateNumberCard(): void {
        var index: number = this.GetRandomNullIndex();
        if (index == -1) {
            return 
        }
        
        var valueArr: number[] = [2, 4];
        var cardValue: number = valueArr[this.GetRandom(0, valueArr.length-1)];

        var dialog: Laya.Image = new Laya.Image("images/2048Atlas_" + cardValue + ".png");
        Laya.stage.addChild(dialog);    // 这里需要使用stage.addChildAt()，但不清楚第一个参数；

        var point: Laya.Point = this.GetGlobalPos(index);
        dialog.pos(point.x+77, point.y+77);     // 77 是轴心偏倚的数值
        dialog.scale(0, 0);
        dialog.pivot(dialog.width/2, dialog.height/2);
        // var carTween:Laya.Tween = new Laya.Tween.to(dialog, {scaleX: 1.2, scaleY: 1.2}, 100, Laya.Ease.quadInOut); // 报错：因为Tween.to返回的是一个对象，所以不需要new
        Laya.Tween.to(dialog, {scaleX: 1.2, scaleY: 1.2}, 100, Laya.Ease.quartInOut);

        var row: number = parseInt(String(index/4));
        var col: number = index%4;
        this.numberArr[row][col] = cardValue;
        this.cardArr[row][col] = dialog;
    }

    /**
     * 根据索引获取stage的全局坐标
     * @param index 
     * @returns 
     */
    GetGlobalPos(index: number): Laya.Point {
        var cell: Laya.Box = this.list.getCell(index);
        var point: Laya.Point = this.list.localToGlobal(new Laya.Point(cell.x, cell.y));
        return point;
    }


    /**
     * 获取随机空位置索引；
     * @returns ‘-1’数组=0；否则return随机空位置的‘索引’；
     */
    GetRandomNullIndex(): number {
        var arr: Array<number> = [];

        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
                if(this.numberArr[i][j]==0){    //寻找‘值=0’的坐标
                    arr.push(i*4+j);
                }
            }
        }
        

        if (arr.length == 0) {
            return -1
        }
        
        var index: number = arr[this.GetRandom(0, arr.length-1)];
        return index;
    }

    /**
     * 随机种子
     * @param min  0
     * @param max  数组长度
     */
    GetRandom(min:number, max:number): number {
        let value = Math.random()*(max-min);
        let seed = Math.round(value);
        return seed+min;
    }
}