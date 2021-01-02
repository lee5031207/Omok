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
            img.src = "resources/image/board/out3.jpg";
            board[i][j] = img;
            img.style.cursor = "default"
            img.className = "noclick";
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

// ===================돌 놓기===================
let turn = "black";
document.querySelectorAll("img").forEach((img)=>{
    img.addEventListener("click",(e)=>{
        if(img.src.slice(-9,-4) == "Black" || img.src.slice(-9,-4) == "White" || img.className == "noclick"){
            alert("잘못클릭하셨습니다");
        }else{
            if(turn == "black"){
                e.target.src = e.target.src.slice(0,-4)+"Black.JPG";
                e.target.className = "Black";
                //e.target.dataset.color = "Black";
                check(e.target);
                turn = "white";
            }else if(turn == "white"){
                e.target.src = e.target.src.slice(0,-4)+"White.JPG";
                e.target.className = "White";
                //e.target.dataset.color = "White";
                check(e.target);
                turn = "black";
            }
        }
       // console.log(turn + "차례 입니다");
       if(turn == "black"){
            document.querySelector(".textbox").innerHTML = "흑 돌 차례 입니다";    
       }else{
            document.querySelector(".textbox").innerHTML = "백 돌 차례 입니다";
       }
       
    })
})

//돌을 놓으면 5개로 이어진 돌이 있나 확인하는 함수
let check = function(img){
    let row = img.dataset.row; 
    let col = img.dataset.col;

    row = Number(row); 
    col = Number(col);
    //console.log(row, col);
    
    let imgClass = board[row][col].className;
    
    if(imgClass == board[row][col-1].className || imgClass == board[row][col+1].className){
        //console.log("sideCheck()함수 실행");
        sideCheck(img);
    }

    if(imgClass == board[row-1][col].className || imgClass == board[row+1][col].className){
        //console.log("sideCheck()함수 실행");
        topBottomCheck(img);
    }
    
    if(imgClass == board[row-1][col-1].className || imgClass == board[row+1][col+1].className){
        //console.log("좌상단 대각선 같은돌 발생");
        leftDownDiagonal(img);
    }
    
    if(imgClass == board[row+1][col-1].className || imgClass == board[row-1][col+1].className){
        //console.log("우상단 대각선 같은돌 발생");
        leftUpDiagonal(img);
    }
}

// 양옆으로 연속된 돌을  확인하는 함수
let sideCheck = function(img){
    //dataset에서 꺼내오는 숫자는 String이다
    //정수로 쓰고 싶으면 반드시 파싱해주자
    let row = Number(img.dataset.row); 
    let col = Number(img.dataset.col);
    
    //가장 왼쪽돌과 오른쪽돌의 위치를 확보
    let left = null;
    for(let i=col; i>=1; i--){
        if(board[row][i].className == img.className){
            left = board[row][i];
        }else{
            break;
        }
    }
    let right = null;
    for(let i=col; i<=19; i++){
        if(board[row][i].className == img.className){
            right = board[row][i];
        }else{
            break;
        }
    }
    let leftCol = Number(left.dataset.col);
    let rightCol = Number(right.dataset.col); 
    let count = 0;
    for(let i=leftCol; i<=rightCol; i++){
        if(board[row][i].className == img.className){
            count++;
        }else if(board[row][i].className != img.className){
            count = 0;
        }
    }
    if(count==5){
        if(img.className == "Black"){
            alert("흑 돌의 승리입니다. 축하합니다!");
            location.reload();
        }else{
            alert("백 돌의 승리입니다. 축하합니다!");
            location.reload();
        }
    }
}

// 위아래로 연속된 돌의 수를 확인하는 함수
let topBottomCheck = function(img){
    let row = Number(img.dataset.row);
    let col = Number(img.dataset.col);
    // top돌과 bottom돌의 위치 확보
    let top = null;
    let bottom = null;
    for(let i=row; i>=1; i--){
        if(board[i][col].className == img.className){
            top = board[i][col];
        }else{
            break;
        }
    }
    for(let i=row; i<=19; i++){
        if(board[i][col].className == img.className){
            bottom = board[i][col];
        }else{
            break;
        }
    }
    let topRow = Number(top.dataset.row);
    let bottomRow = Number(bottom.dataset.row);
    let count = 0;
    for(let i=topRow; i<=bottomRow; i++){
        if(board[i][col].className == img.className){
            count++;
        }else if(board[i][col].className != img.className){
            count = 0;
        }
    }
    if(count==5){
        if(img.className == "Black"){
            alert("흑 돌의 승리입니다. 축하합니다!");
            location.reload();
        }else{
            alert("백 돌의 승리입니다. 축하합니다!");
            location.reload();
        }
    }
}

//좌상단->우하단 연속된 돌을 확인하는 함수
let leftDownDiagonal = function(img){
    let row = Number(img.dataset.row);
    let col = Number(img.dataset.col);
    let leftTop = null; let rightBottom = null;
    let flag = true;
    let i = row; let j = col;
    while(flag){
        if(i>=1 && j>=1){
            if(board[i][j].className == img.className){
                leftTop = board[i][j];
            }else{
                flag = false;
            }
            i--;j--;
        }else{
            flag = false;
        }
    }
    flag=true;
    i=row; j=col;
    while(flag){
        if(i<=19 && j<=19){
            if(board[i][j].className == img.className){
                rightBottom = board[i][j];
            }else{
                flag = false;
            }
            i++;j++;
        }else{
            flag = false;
        }
    }

    let count = 0;
    flag = true;
    i = Number(leftTop.dataset.row);
    j = Number(leftTop.dataset.col);
    while(flag){
        if(i <= Number(rightBottom.dataset.row) && j <= Number(rightBottom.dataset.col)){
            if(board[i][j].className == img.className){
                count++;
            }else if(board[i][j].className != img.className){
                count = 0;
            }
            i++; j++;
        }else{
            flag = false;
        }
    }
    if(count==5){
        if(img.className == "Black"){
            alert("흑 돌의 승리입니다. 축하합니다!");
            location.reload();
        }else{
            alert("백 돌의 승리입니다. 축하합니다!");
            location.reload();
        }
    }
}

//좌하단->우상단 연속된 돌을 확인하는 함수
let leftUpDiagonal = function(img){
    let row = Number(img.dataset.row);
    let col = Number(img.dataset.col);
    let leftBottom = null; let righTop = null;
    let flag = true;
    let i = row; let j = col;
    while(flag){
        if(i <= 19 && j >= 1){
            if(board[i][j].className == img.className){
                leftBottom = board[i][j];
            }else{
                flag = false;
            }
            i++; j--;
        }else{
            flag = false;
        }
    }
    flag = true;
    i=row; j=col;
    while(flag){
        if(i >= 1 && j <= 19){
            if(board[i][j].className == img.className){
                righTop = board[i][j];
            }else{
                flag = false;
            }
            i--; j++;
        }else{
            flag = false;
        }
    }

    let count = 0;
    flag = true;
    i = Number(leftBottom.dataset.row);
    j = Number(leftBottom.dataset.col);
    while(flag){
        if(i >= Number(righTop.dataset.row) && j <= Number(righTop.dataset.col)){
            if(board[i][j].className == img.className){
                count++;
            }else if(board[i][j].className != img.className){
                count = 0;
            }
            i--; j++;
        }else{
            flag = false;
        }
    }
    if(count==5){
        if(img.className == "Black"){
            alert("흑 돌의 승리입니다. 축하합니다!");
            location.reload();
            
        }else{
            alert("백 돌의 승리입니다. 축하합니다!");
            location.reload();
        }
    }    
}












