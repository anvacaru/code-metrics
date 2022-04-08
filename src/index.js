#!/usr/bin/env node

const {SolidityMetricsContainer} = require('solidity-code-metrics');

let options = {
    basePath:undefined,
    inputFileGlobExclusions:undefined,
    inputFileGlob: "**/*.sol",
    inputFileGlobLimit: undefined,
    debug:false,
    repoInfo: {
        branch: undefined,
        commit: undefined,
        remote: undefined
    }
}

let metrics = new SolidityMetricsContainer("metricsContainerName", options);

var filenames = [];

process.argv.slice(1,).forEach(f => {
    if(f.endsWith(".sol")){
        // analyze files
        filenames.push(f);
        metrics.analyze(f);
    }
});

console.log("| file | lines | nLines | nSLOC | Comment Lines | Complexity Score |")
console.log("|------|-------|--------|-------|---------------|------------------|")

metrics.metrics.forEach((f, fileId) => {
    var message = "| " + filenames[fileId] + " | "
        message += f.metrics.sloc.total + " | "
        message += f.metrics.nsloc.total + " | "
        message += f.metrics.nsloc.source + " | "
        message += f.metrics.nsloc.comment + " | "
        message += f.metrics.complexity.perceivedNaiveScore + " | "
        console.log(message)
})
