#! /usr/bin/env ts-node

import * as FS from 'fs';


(async () => {

    const jsonData: { scores: { name: string, score: number }[] } = JSON.parse(FS.readFileSync('./demo.json', { encoding: 'utf-8' }))
    console.log(jsonData)
    jsonData.scores.forEach((score) => {
        console.log(`${score.name} Scored ${score.score}`)
    })


})()