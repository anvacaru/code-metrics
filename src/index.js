const {SolidityMetricsContainer} = require('solidity-code-metrics');

let options = {
        basePath:"",
            inputFileGlobExclusions:undefined,
                inputFileGlob: undefined,
                    inputFileGlobLimit: undefined,
                        debug:false,
                            repoInfo: {
                                        branch: undefined,
                                                commit: undefined,
                                                        remote: undefined
                            }
}

let metrics = new SolidityMetricsContainer("metricsContainerName", options);


process.argv.slice(1,).forEach(f => {
    if(f.endsWith(".sol")){
        // analyze files
        metrics.analyze(f);
    }
});

console.log("| file | lines | nLines | nSLOC | Comment Lines | Complexity Score |")
console.log("|------|-------|--------|-------|---------------|------------------|")

metrics.metrics.forEach(f => {
        var message = "| name | "
            message += f.metrics.sloc.total + " | "
                message += f.metrics.nsloc.total + " | "
                    message += f.metrics.nsloc.source + " | "
                        message += f.metrics.nsloc.comment + " | "
                            message += f.metrics.complexity.perceivedNaiveScore + " | "
                                console.log(message)
})
