// This can be run from node.js or in the browser.

// row names
let [A,B,C,D,E,F] = [0,1,2,3,4,5]
let [x,y] = [0,1]

let rowNames = {1: "A", 2: "B", 3: "C", 4: "D", }
let origin = {x: 0, y: 0 }
let sidesLength = 10

rowNameForRow = (row) => String.fromCharCode(row + 65)
vertex = () => ( {x: 0, y: 0} )
/*
 * getTriangleForPosition takes two parameters, row and col which correspond to
 * the row and column of a matrix. The function returns a JSON object
 * containing the coordinates of the vertices of a right triangle for the given
 * row and column, as well as a "position" which labels the position in the
 * matrix.  v1 is the point opposite the hypontenuse, v2 is the upper left
 * point, and v3 the lower right point.
 *
 * The parameters are both numbers, but the interface takes the row as letters,
 * so a position in the matrix would be C7, for example.
 */
getTriangleForPosition = (row, col) => {
    //console.log(`triangle for ${rowNameForRow(row)}${col}`)
    
    // even numbered columns have two top vertices
    let isEven = col % 2 == 0

    if (isEven) {
        let upperLeft = vertex(), upperRight = vertex(), lowerRight = vertex()
        let left_x = origin.x + ((col * sidesLength) / 2 - sidesLength)
        let right_x = origin.x + ((col * sidesLength) / 2)
        let upper_y = origin.y + (row * sidesLength)
        let lower_y = origin.y + ((row * sidesLength) + sidesLength)

        upperLeft.x = left_x
        upperLeft.y = upper_y

        upperRight.x = right_x 
        upperRight.y = upper_y

        lowerRight.x = right_x
        lowerRight.y = lower_y 

        // v1 is always the vertex opposite the hypotenuse, v2 upplerLeft, and v3 is lowerRight
        return {position: `${rowNameForRow(row)}${col}`,v1: upperRight, v2: upperLeft, v3: lowerRight}        
    } else {
        let upperLeft = vertex(), lowerLeft = vertex(), lowerRight = vertex()
        let left_x = origin.x + ((col * sidesLength) / 2 - (sidesLength /2))
        let right_x = origin.x + ((col * sidesLength) / 2 + (sidesLength /2))
        let upper_y = origin.y + (row * sidesLength)
        let lower_y = origin.y + (row * sidesLength) + sidesLength


        upperLeft.x = left_x
        upperLeft.y = upper_y

        lowerLeft.x = left_x
        lowerLeft.y = lower_y

        lowerRight.x = right_x
        lowerRight.y = lower_y

        // v1 is always the vertex opposite the hypotenuse, v2 upplerLeft, and v3 is lowerRight
        return {position: `${rowNameForRow(row)}${col}`, v1: lowerLeft, v2: upperLeft, v3: lowerRight}        
    }
}
/*
 * getPositionFromCoordinates takes three x,y coordinate pairs corresponding to
 * vertices of a right triangle that can be drawn inside the cells of a matrix.
 * v1 is the point opposite the hypotenuse, v2 the upper lefts point, and v3
 * the lower right.
 *
 * It then returns the matrix coordinate of the corresponding triangle, such as 'A3'
 */
getPositionFromCoordinates = (v1, v2, v3) => {
    let upperLeft = vertex(), lowerRight = vertex();

    [upperLeft.x, upperLeft.y] = [v2[x], v2[y]]

    [lowerRight.x, lowerRight.y] = [v3[x], v3[y]]

    // Let's figure out if we are odd or even
    let thirdPoint = vertex();
    [thirdPoint.x, thirdPoint.y] = [v1[x], v1[y]]

    let row, col
    if (thirdPoint.x == upperLeft.x) {
        // odd column, so the triangle is to the right, we are done
        col = thirdPoint.x / sidesLength * 2
    } else {
        // even column, so the triangle is to the left, add one
        col = thirdPoint.x / sidesLength * 2 + 1
    }
    row = thirdPoint.y / sidesLength

    return `${rowNameForRow(row)}${col}`

}

examples = () => {
    let A1 = getTriangleForPosition(A,1)
    console.log(A1)
    console.assert(JSON.stringify(A1) == '{"position":"A1","v1":{"x":0,"y":10},"v2":{"x":0,"y":0},"v3":{"x":10,"y":10}}')

    let C3 = getTriangleForPosition(C,3)
    console.log(C3)
    console.assert(JSON.stringify(C3) == '{"position":"C3","v1":{"x":10,"y":30},"v2":{"x":10,"y":20},"v3":{"x":20,"y":30}}')

    let F1 = getTriangleForPosition(F,1)
    console.log(F1)
    console.assert(JSON.stringify(F1) == '{"position":"F1","v1":{"x":0,"y":60},"v2":{"x":0,"y":50},"v3":{"x":10,"y":60}}')

    let F12 = getTriangleForPosition(F,12)
    console.log(F12)
    console.assert(JSON.stringify(F12) == '{"position":"F12","v1":{"x":60,"y":50},"v2":{"x":50,"y":50},"v3":{"x":60,"y":60}}')

    let D8 = getTriangleForPosition(D,8)
    console.log(D8)
    console.assert(JSON.stringify(D8) == '{"position":"D8","v1":{"x":40,"y":30},"v2":{"x":30,"y":30},"v3":{"x":40,"y":40}}')

    let C7 = getTriangleForPosition(D,7)
    console.log(C7)
    console.assert(JSON.stringify(C7) == '{"position":"D7","v1":{"x":30,"y":40},"v2":{"x":30,"y":30},"v3":{"x":40,"y":40}}')

    console.log("\n==========================\n")
    console.log("position for D8 - [40,30], [30,30], [40,40]:", getPositionFromCoordinates([40,30], [30,30], [40,40]))
    console.log("position for B5 - [20,20], [20,10], [30,20]:", getPositionFromCoordinates([20,10], [30,20], [30,20]))

    console.log("position for F12 - [60,50], [50,50], [60,60]:", getPositionFromCoordinates([F12.v1.x, F12.v1.y],[F12.v2.x, F12.v2.y],[F12.v3.x, F12.v3.y]))
}
if (typeof module != 'undefined' && !module.parent) {
  // this is the main module, run from node
  examples()
}
