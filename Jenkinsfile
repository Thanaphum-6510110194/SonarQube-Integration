pipeline {
    agent any
    tools { nodejs 'NodeJS-24.7.0' }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Thanaphum-6510110194/SonarQube-Integration.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
    }
}
