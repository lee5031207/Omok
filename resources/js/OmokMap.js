//===================바둑판 그리기===================
let board = new Array(21);
for (let i = 0; i < board.length; i++) {
    board[i] = new Array(21);
}

for(let i=0; i<21; i++){
    let line = document.createElement("div");
    line.className = "line";
    for(let j=0; j<21; j++){
        let img = document.createElement("img");
        img.className = "none";
        if(i==1 && j==1){ //좌상단
            img.src = "resources/image/board/leftTop.JPG";
            board[i][j] = img;
            img.dataset.row = i;
            img.dataset.col = j;
            line.append(img);
        }else if(i==1 && j==19){  //우상단
            img.src = "resources/image/board/rightTop.JPG";
            board[i][j] = img;
            img.dataset.row = i;
            img.dataset.col = j;
            line.append(img);
        }else if(i==19 && j==1){ //좌하단
            img.src = "resources/image/board/leftBottom.JPG";
            board[i][j] = img;
            img.dataset.row = i;
            img.dataset.col = j;
            line.append(img);
        }else if(i==19 && j==19){ //우하단
            img.src = "resources/image/board/rightBottom.JPG";
            board[i][j] = img;
            img.dataset.row = i;
            img.dataset.col = j;
            line.append(img);
        }else if(i==1 && j!=0  && j!=20){
            img.src = "resources/image/board/top.JPG";
            board[i][j] = img;
            img.dataset.row = i;
            img.dataset.col = j;
            line.append(img);
        }else if(i==19 && j!=0  && j!=20){
            img.src = "resources/image/board/bottom.JPG";
            board[i][j] = img;
            img.dataset.row = i;
            img.dataset.col = j;
            line.append(img);
        }else if(j==1 && i!=0  && i!=20){
            img.src = "resources/image/board/left.JPG";
            board[i][j] = img;
            img.dataset.row = i;
            img.dataset.col = j;
            line.append(img);
        }else if(j==19 && i!=0  && i!=20){
            img.src = "resources/image/board/right.JPG";
            board[i][j] = img;
            img.dataset.row = i;
            img.dataset.col = j;
            line.append(img);
        }else if(i==0 || i==20 || j==0 || j==20){
            img.src = "resources/image/board/out2.JPG";
            board[i][j] = img;
            img.dataset.row = i;
            img.dataset.col = j;
            line.append(img);
        }else{
            img.src = "resources/image/board/board.JPG";
            board[i][j] = img;
            img.dataset.row = i;
            img.dataset.col = j;
            line.append(img);
        }
        document.querySelector(".board").append(line);        
    }
}
