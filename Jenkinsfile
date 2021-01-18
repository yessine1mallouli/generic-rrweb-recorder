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
        sshagent(['dev-server']) {
        sh (returnStdout:true, script: '''#!/bin/bash
            
            ssh -o StrictHostKeyChecking=no ubuntu@15.237.81.252 ' 
            dockerName='c2container'
            dockerImageName='yessinemallouli/generic-rrweb-recorder:1.0'
            if [ ! "$(docker ps -q -f name=$dockerName)" ]; then
                    if [ "$(docker ps -aq -f status=exited -f name=$dockerName)" ]; then
                        # cleanup
                        docker rm $dockerName
                    fi
                 # run your container
                 docker run -t -p 80:8888 --name $dockerName $dockerImageName
            fi'
        '''.stripIndent())
        }
             
    }
}