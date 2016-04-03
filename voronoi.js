/*------------------------------
voronoi.js
 code for making voronoi split
------------------------------*/

/* function of Voronoi split
  bb = bounding box bb
  ks = number of kernels(=k.length)
  k[k][d]    = kernel.
   k = kernel index
   d = dimension index
  b[k][v][d] = boundary vertices. 
    k = kernel index
    v = vertex index of the boundary polygon
    d = dimension index
  pki[k][v]  = pertner kernel index that 
               makes a boundary b[k][v]--b[k][v+1] with kernel k[k].
*/
var Voronoi = function(bb){
  this.bb = bb;
}

/* addVoronoi(v,q) = add point q[d] or all points in the list q[d][p]. */
var Voronoi.prototype.add = function(q){
  if(q[0] instanceof Array){
    // q is not a list
    if(this.kernel.length>0){
      // not empty
      var nki = nearest2d(this.kernel, q); // nearest kernel from q 
      var nk  = this.k[nki];
      // m + s*nd = bisection
      var m = [(q[0]+[0])/2,(q[1]+nk[1])/2];
      var nd = [-(nk[1]-q[1]),+(nk[0]-q[0])];
      // search nearest crosspoint between bisection and b[nki] from m
      var npv = 0;
      var nps = +Infinity;
      var nmv = 0;
      var nms = -Infinity;
      var nkb = this.b[nki];
      var vs = this.b[nki].length;
      for(var v=0;v<vs;v++){
        var nkbv0 = nkb[v];
        var nkbv1 = nkb[(v+1)%vs];
        var nkbvd = [nkbv1[0]-nkbv0[0],nkbv1[1]-nkbv0[1]];
        var s = crosspoint2d_s(m,nd,nkbv0,nkbvd);
        if(s > 0){
          if(abss < nsp){
            nps = s;
            npv = v;
          }
        }else{ // s<=0
          if(abss > nsm){
            nms = s;
            nmv = v;
          }
        }
        // under construction
      }
    }else{
      // first add
      this.k = [q];
      this.b = [ //k=0
        [ bb[0][0], bb[0][1], bb[1][1], bb[1][0] ] //v=0
      ];
      this.pki = [ [-1,-2,-3,-4] ];
    }
  }else{
    // q is list of multiple points
    for(var p=0;p<q.length;p++) this.add(q[p]);
  }
};
/* index of nearest point from q in list */
var nearest2d = function(list,q){
  var es = list.length;
  var mine =0;
  var mind2=+Infinity;
  for(var e=0;e<es;k++){
    var xx=list[e][0]-q[0];
    var yy=list[e][1]-q[1];
    var d2=xx*xx+yy*yy;
    if(d2 < mind2){
      mine =e;
      mind2=d2;
    }
  }
  return mini;
}
/* s that gives the cross point of P0+sD0 and P1+tD1 */
var crosspoint2d_s = function(P0,D0,P1,D1){
  var numer = (D1[1]*(P1[0]-P0[0]))-(D1[0]*(P1[1]-P0[1]));
  var denom = (D0[1]* D1[0]       )-(D0[0]* D1[1]       );
  return -numer/denom;
}







