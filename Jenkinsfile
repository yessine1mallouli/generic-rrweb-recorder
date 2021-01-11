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
}