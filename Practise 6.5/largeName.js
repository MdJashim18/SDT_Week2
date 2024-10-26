const large = (array) => {
    let largeName = array[0];

    for (let i = 0; i < array.length; i++) {
        const element = array[i];

        if (element.length>largeName.length) {
            largeName = element;
        }
        
    }

    return largeName;
    
}
var friends = ["rahim", "karim", "abdul", "sadsd", "heroAlom"];
const LargeName = large(friends);

console.log(LargeName);