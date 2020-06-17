pipeline {
    agent any

    stages {
        stage('Staging') {
            steps {
                sh 'docker-compose build'
                sh 'docker-compose up -d'
            }
        }
    }
}