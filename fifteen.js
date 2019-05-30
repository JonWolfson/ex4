window.onload = function () {
  let usednums = [];
  let tiles = [];

  let posw = 0;
  let posh = 0;
  let posx = 0;
  let posy = 0;
  puzzleArea = document.getElementById("puzzlearea");

  for(i = 1; i < 16; i++) {
    let tile = document.createElement("div");
    tile.setAttribute("class", "tile");
    tile.position = i;
    tile.innerHTML= i;
    tile.style.backgroundPosition = posw + "% " + posh + "%";
    tile.style.left = posx + "px";
    tile.style.top = posy + "px";
    puzzleArea.appendChild(tile);

    if(i % 4 == 0) {
      posh += 30;
      posw = 0;
      posy += 100;
      posx = 0;
    } else {
      posw += 30;
      posx += 100
    }

    tiles.push(tile);
  }

  let tile = document.createElement("div");
  tile.setAttribute("id", "blanktile");
  tile.style.left = posx + "px";
  tile.style.top = posy + "px";
  tile.position = 16;
  puzzleArea.appendChild(tile);
  tiles.push(tile);

// mousing over a neigbor
  for(i = 0; i < tiles.length; i++) {
    tiles[i].onmouseover = function (i) {
      change = i.target;
    if((change.position == tile.position - 1 && change.position % 4 != 0) || change.position == tile.position - 4 || (change.position == tile.position + 1 && tile.position % 4 != 0) || change.position == tile.position + 4) {
        change.style.borderColor = "red";
        change.style.color  = "red";
        change.style.cursor = "pointer";
      }
    }
  }

// taking your mouse off a neigbor
  for(i = 0; i < tiles.length; i++) {
    tiles[i].onmouseout  = function (i) {
      change = i.target;
      if((change.position == tile.position - 1 && change.position % 4 != 0) || change.position == tile.position - 4 || (change.position == tile.position + 1 && tile.position % 4 != 0) || change.position == tile.position + 4) {
        change.style.borderColor = "black";
        change.style.color  = "black";
        change.style.cursor = "default";
      }
    }
  }

  for(i = 0; i < tiles.length; i++) {
    tiles[i].onclick = function (i) {
      change = i.target;
      if((change.position == tile.position - 1 && change.position % 4 != 0) || change.position == tile.position - 4 || (change.position == tile.position + 1 && tile.position % 4 != 0) || change.position == tile.position + 4) {
        let swap = i.target;
        let xx = swap.style.left;
        let xy = swap.style.top;
        let xp = swap.position;
        swap.style.left = tile.style.left;
        swap.style.top = tile.style.top;
        swap.position = tile.position;
        tile.style.left = xx;
        tile.style.top = xy;
        tile.position = xp;
      }
    }
  }
// shuffle button
  document.getElementById("shufflebutton").onclick = function () {
    for(i = 0; i < 1000; i++) {
      neighbors = [];

      if(tile.position + 1 < 17) {
        neighbors.push(tiles[tile.position])
        if(tile.position + 4 < 17) {
          neighbors.push(tiles[tile.position + 3])
        }
      }

      if(tile.position - 1 > 0) {
        neighbors.push(tiles[tile.position - 2])
        if(tile.position - 4 > 0) {
          neighbors.push(tiles[tile.position - 5])
        }
      }

      let swap = neighbors[Math.round(Math.random() * (neighbors.length - 1))];
      let xx = swap.style.left;
      let xy = swap.style.top;
      let xp = swap.position;
      swap.style.left = tile.style.left;
      swap.style.top = tile.style.top;
      swap.position = tile.position;
      tile.style.left = xx;
      tile.style.top = xy;
      tile.position = xp
    }
  }
}
