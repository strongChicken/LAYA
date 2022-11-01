export default class GameManager extends Laya.Script {
    // 定义二维数组
    numberArr: Array<Array<number>>;
    list = new Laya.List();
    constructor() {
        super();
        /** @prop {name: list, tips:"获取单元格",type:node} */
        this.list = null;
        this.numberArr = new Array<Array<number>>(4);
    }

    onAwake(): void {
        // 初始化二维数组
        for(let i=0; i<4; i++) {
            this.numberArr[i] = new Array<number>(4);
            for (let j=0; j<4; j++ ){
                this.numberArr[i][j] = 0;
            }
        }
        // console.log(this.numberArr);

        this.CreateNumberCard();
        this.CreateNumberCard();

        this.LoadTexture();
    }
    
    LoadTexture(): void {
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
            console.log(result);
        }));
    }


    // 记录空的格子
    CreateNumberCard(): void {
        var index: number = this.GetRandomNullIndex();
        if (index == -1) {
            return 
        }
        var cell: Laya.Box = this.list.getCell(index);

        var row: number = parseInt(String(index/4));
        var col: number = index%4;
        
        var dialog: Laya.Image = Laya.loader.getRes("images/2048Atlas_" + 2 + ".png");
        Laya.stage.addChild(dialog);
        var point = this.list.localToGlobal(new Laya.Point(cell.x, cell.y));

        dialog.pos(point.x, point.y);
        dialog.scale(1.2, 1.2);

        // sprite.pos(cell.x, cell.y);
        // sprite.scale(1.8, 1.8);

        // console.log("index:", index);
        // console.log("row:", row);
        // console.log("col:", col);
        
    }

    /**
     * 随机获取空位置索引；
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