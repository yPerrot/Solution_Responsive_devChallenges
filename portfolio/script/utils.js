export function arrayRemove(arr, value) {   
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

export function readJsonFile(path) {
    return new Promise( (resolve) => {
        fetch(path).then(res => {
            resolve(res.json());
        });
    });
};
