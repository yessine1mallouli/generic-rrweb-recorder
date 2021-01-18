node{
    stage('SCM Checkout'){
        git credentialsId: 'git-creds', url: 'https://github.com/yessine1mallouli/generic-rrweb-recorder'
    }
    stage('Build')
    {
        echo "Build the code"
        nodejs('node') {
    // some block
    sh "npm install"
}
    }
    stage('Unit testing')
    {
        echo "test the code"
        nodejs('node') {
    // some block
    sh "npm test"
}
    }
    stage('Build Docker Image')
    {
        sh 'docker build -t yessinemallouli/generic-rrweb-recorder:1.0 .'
    }
    stage('Push Docker Image')
    {
        withCredentials([string(credentialsId: 'docker-pwd', variable: 'dockerHubPwd')]) {
        sh "docker login -u yessinemallouli -p ${dockerHubPwd}"
    }
        sh 'docker push yessinemallouli/generic-rrweb-recorder:1.0'
    }
    stage('Run Container on a remote server')
    {
        def dockerRun='docker run -t -p 80:8888 --name c2container yessinemallouli/generic-rrweb-recorder:1.0'
        def dockerDel='docker rm c2container'
        def dockerName='c2container'
        //def dockerCheck= "docker ps -q -f name=${dockerName}"
        //def dockerExist = "docker ps -aq -f status=exited -f name=${dockerName}"
        //def checkCom= sh "ssh -o StrictHostKeyChecking=no ubuntu@15.237.81.252  ! ${dockerCheck}"
        //def existCom = sh "ssh -o StrictHostKeyChecking=no ubuntu@15.237.81.252  ${dockerExist}"
        sshagent(['dev-server']) {
        sh (returnStdout:true, script: '''#!/bin/bash
            
             ssh -o StrictHostKeyChecking=no ubuntu@15.237.81.252 'docker rm c2container'
        '''.stripIndent())
        }
             
    }/*sh (returnStdout:true, script: '''#!/bin/bash
             if [ ${checkCom} ]; then
                    if [ ${existCom}]; then
                     # cleanup
                     ssh -o StrictHostKeyChecking=no ubuntu@15.237.81.252 ${dockerDel}
                    fi
                # run on remote container
                #ssh -o StrictHostKeyChecking=no ubuntu@15.237.81.252  ${dockerRun}
            fi
        '''.stripIndent())
        }*/
        /*sshagent(['dev-server']) {
             if (`checkCom`){
                 if (`existCom`){
                     sh "ssh -o StrictHostKeyChecking=no ubuntu@15.237.81.252 ${dockerDel}"
                 }
                sh "ssh -o StrictHostKeyChecking=no ubuntu@15.237.81.252 ${dockerRun}"
             }
        }*/
}