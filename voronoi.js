/*------------------------------
voronoi.js
 code for making voronoi split
------------------------------*/

/* function of Voronoi split
  this.sbb[s].b   = vertices of screen bounding box
  this.sbb[s].pki = pertner kernel list of screen bounding box
  this.k[k][d]    = kernel.
   k = kernel index
   d = dimension index
  this.b[k][v][d] = list of vertices of boundary polygon. 
    k = kernel index
    v = vertex index of the boundary polygon
    d = dimension index
  this.pki[k][v]  = pertner kernel index that 
               makes a boundary b[k][v]--b[k][v+1] with kernel k[k].
*/
var Voronoi = function(sbb){
  this.sbb.b   = sbb;
  this.sbb.pki = [];
  this.k   = [];
  this.b   = [];
  this.pki = [];
}

/* addVoronoi(v,q) = add point q[d] or all points in the list q[d][p]. */
var Voronoi.prototype.add = function(q){
  if(q[0] instanceof Array){
    // q is not a list
    if(this.k.length>0){
      // not empty
      
      var newk = q; // new kernel is q.
      var nki  = nearest2d(this.kernel, q); // nearest kernel from q 
      var pki  = nki; // pivot kernel
      var newb   = [];
      var newpki = [];
      do{
        var pk   = this.k[pki];
        
        // m + s*nd = bisection
        var m = [(q[0]+[0])/2,(q[1]+pk[1])/2];
        var nd = [-(pk[1]-q[1]),+(pk[0]-q[0])];
        // search nearest crosspoint between bisection and b[pki] from m
        var npk = -1;
        var nps = +Infinity;
        var nmk = -1;
        var nms = -Infinity;
        var pkb = this.b[pki];
        var vs = pkb.length;
        for(var v=0;v<vs;v++){
          var pkbv0 = pkb[v];
          var pkbv1 = pkb[(v+1)%vs];
          var pkbvd = [pkbv1[0]-pkbv0[0],pkbv1[1]-pkbv0[1]];
          var s = crosspoint2d_s(m,nd,pkbv0,pkbvd);
          if(s > 0){
            if(abss < nsp){
              nps = s;
              npe = v;
            }
          }else{ // s<=0
            if(abss > nsm){
              nms = s;
              nme = v;
            }
          }
        }//for v
        /* here is:
          nps = nearest potitive s:
           that gains nearest crosspoint 
           between bisection and boundary of pki in s>0.
          nms = nearest negative s:
           that gains nearest crosspoint 
           between bisection and boundary of pki in s<=0.
          npe = edge for nps.
          nme = edge for nms.
        */
        if(newb.length==0){
          // newb   = new boundaries of pk and q = nearest crosspoints.
          oldb   = [m[0]+nms*nd[0],m[1]+nms*nd[1]]; 
          newb   = [m[0]+nps*nd[0],m[1]+nps*nd[1]];
          if(npe<0){
            //if npe is not screen bounding box:
            this.pki[k][nme]
          }else{
            //if npe is screen bounding box:
            //then skip and add q into sbb[bbi]
            var bbi = (-npe)-1;
            pki = (this.sbb[bbi].pki.indexOf(pki)+1)%this.sbb[bbi].pki.length;
          }
          break;
        }else{
          newb  .push(m[0]+nps*nd[0],m[1]+nps*nd[1]);
          newpki.push(this.plo[k][npv]);
          if(this.pki[k][npv]==nki){
            //when back to nearest kernel:
            break;
          }
        }
      }while(1);
    }else{
      // first add
      this.k      .push(q            );
      this.b      .push(sbb          );
      this.pki    .push([-1,-2,-3,-4]);
      this.sbb.pki.push([ 0, 0, 0, 0]);
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







