node {
    stage('get code from github'){
        git(
           url: 'https://github.com/brandonrvice/rythm-api.git',
           credentialsId: 'e4129cd7-8637-49b0-9358-8173688908c0',
           branch: "master"
        )
    }
    stage('build'){
        echo "Get env file."
        sh "cp /var/jenkins_home/secrets/env/env-rythm-api ."
        sh "mv env-rythm-api .env"
        sh "ls -al"
        echo "Get git rev-parse head."        
        git_head = sh(returnStdout: true, script: "git rev-parse HEAD").trim()
        echo "Build docker image."
        sh "docker build -t matrixacr.azurecr.io/rythm-api:$git_head -f Dockerfile ."
        echo "Push new docker image to container repository."
        sh "docker push matrixacr.azurecr.io/rythm-api:$git_head"
        echo "Deploy to kubernetes cluster."
        sh "/usr/local/bin/kubectl set image deployments/rythm-api rythm-api=matrixacr.azurecr.io/rythm-api:$git_head --kubeconfig /var/jenkins_home/secrets/azure-k8-config"
    }
}