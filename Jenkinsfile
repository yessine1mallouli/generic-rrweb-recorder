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
    stage('Delivery')
    {
        echo "deliver the code"
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
        sshagent(['dev-server']) {
            sh "ssh -o StrictHostKeyChecking=no ubuntu@15.237.81.252 ${dockerRun}"
        }
    }
}