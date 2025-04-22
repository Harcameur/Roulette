const template_id = "roulette_template";
const template_item_id = "roulette_item";

const template_element = document.getElementById(template_id);
const template_item = document.getElementById(template_item_id);
const root = document.querySelector(':root');


const template_list = template_element.querySelector(".roulette-list");

export function initRouletteTemplate(list) {
    console.log(list.length, list)
    root.style.setProperty('--number-of-items', list.length);
    template_list.innerHTML = "";

    for(let el in list) {
        const clone = template_item.cloneNode(true);
        clone.id = "";
        clone.classList.remove("template");
        clone.textContent = list.at(el);
        template_list.appendChild(clone);
    }
}

export function rotation(element, rotate, delay) {
    return anime({
        targets: element,
        delay: delay,
        rotate: rotate,
        easing: 'easeInOutSine',
        duration: 7000,
    })
}

export function createARoulette(id, parents) {
    const clone = template_element.cloneNode(true);
    clone.id = id;
    parents.appendChild(clone);
    return clone;
}