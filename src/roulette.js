import { rotation, createARoulette, initRouletteTemplate } from "./roulette_ui.js";


const html_textarea_names_id = "names_area";
const html_input_winning_number_id = "number_input";
const html_roulettes_view_id = "roulettes_view"

const html_textarea_names = document.getElementById(html_textarea_names_id);
const html_input_winning_number = document.getElementById(html_input_winning_number_id);
const html_roulettes_view = document.getElementById(html_roulettes_view_id);

const min_tours = 15;


export function startRoulette() {

    html_roulettes_view.innerHTML = "";

    const area_values = html_textarea_names.value;
    const input_values = html_input_winning_number.value;
    console.log(area_values);

    const splitted_names = serialize_data(area_values).split(";");

    if (splitted_names[splitted_names.length-1] == '') {
        splitted_names.pop();
    }

    const original_list = splitted_names.slice();
    const splitted_names_length = splitted_names.length;
    console.log(splitted_names);

    if (splitted_names.length < input_values) {
        displayErrorNotification("trop grand nombre de gagnant");
        return;
    }

    initRouletteTemplate(splitted_names);

    const gagnants = [];

    for(let i = 0; i < input_values; i++) {
        const roulette = createARoulette(i, html_roulettes_view)
        const gagnant = findAndRemove(splitted_names);
        console.log("Gagnant " + i + " :" + gagnant);
        gagnants.push(gagnant);
        rotation(
            roulette.querySelector(".roulette-list"), 
            getNumberOfTurns(original_list.indexOf(gagnant), splitted_names_length),
            500*i);
    }

    console.log("rotating")

}

function findAndRemove(list) {
    const gagnant_id = getRandomInt(list.length);
    const gagnant = list.at(gagnant_id);
    list.splice(gagnant_id, 1);
    return gagnant;
}

function displayErrorNotification(msg) {
    alert(msg);
}

function serialize_data(text) {
    return  text.replaceAll("\n","")
                .replaceAll("\t","")
                .replaceAll(" ","");
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getNumberOfTurns(id, length) {
    console.log(id,length);

    const num = min_tours + id/length;
    console.log(num +'turn');
    return num +'turn';
}