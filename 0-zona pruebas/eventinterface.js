class UnaClase{
    constructor(unaPropiedad){
        this.unaPropiedad = unaPropiedad;
    }
    enseñar(item){
        console.log("UnaClase te enseña esto: "+item);
    }
}
class OtraClase{
    constructor(unaPropiedad, otraPropiedad, elementID){
        this.unObjeto = new UnaClase(unaPropiedad);
        this.otrapropiedad = otraPropiedad;
        this.addEventListeners(elementID);
    }
    addEventListeners(elementID){
        const button = document.querySelector(elementID);
        button.addEventListener("click", this.handleEvent);
    }
    handleEvent(event){
        this.unObjeto.enseñar(event.target.id); //TypeError: unObjeto es undefined
    }
}

const myObjeto = new OtraClase("cactus", "cocina", "#idbot");
